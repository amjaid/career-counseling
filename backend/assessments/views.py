from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db.models import Count
from .models import CareerPath, Question, AssessmentResult
from .serializers import CareerPathSerializer, QuestionSerializer, AssessmentResultSerializer


class CareerPathViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for career paths."""
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer
    permission_classes = [AllowAny]


class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    """API endpoint for questions."""
    queryset = Question.objects.filter(is_active=True)
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        return queryset


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_assessment(request):
    """Submit assessment answers and get results."""
    answers = request.data.get('answers', {})
    
    if not answers:
        return Response({'error': 'No answers provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate scores by category
    scores = {'interests': 0, 'skills': 0, 'personality': 0, 'values': 0}
    categories_count = {'interests': 0, 'skills': 0, 'personality': 0, 'values': 0}
    
    for question_id, option_index in answers.items():
        try:
            question = Question.objects.get(id=question_id)
            options = question.options
            
            if isinstance(option_index, int) and 0 <= option_index < len(options):
                score = options[option_index].get('score', 0)
                scores[question.category] += score
                categories_count[question.category] += 1
        except (Question.DoesNotExist, ValueError):
            continue
    
    # Normalize scores (0-100)
    for cat in scores:
        if categories_count[cat] > 0:
            scores[cat] = min(100, (scores[cat] / (categories_count[cat] * 5)) * 100)
    
    # Get career recommendations based on scores
    career_paths = CareerPath.objects.all()
    recommendations = []
    
    for career in career_paths:
        match_score = 0
        # Simple matching algorithm
        if career.required_skills:
            for skill in career.required_skills:
                skill_lower = skill.lower()
                if 'software' in skill_lower or 'programming' in skill_lower:
                    match_score += scores.get('skills', 0) * 0.3
                if 'design' in skill_lower or 'creative' in skill_lower:
                    match_score += scores.get('interests', 0) * 0.3
                if 'analysis' in skill_lower or 'data' in skill_lower:
                    match_score += scores.get('personality', 0) * 0.2
                if 'helping' in skill_lower or 'teaching' in skill_lower:
                    match_score += scores.get('values', 0) * 0.2
        
        if match_score > 0:
            recommendations.append({
                'id': career.id,
                'name': career.name,
                'match_score': min(100, int(match_score)),
                'description': career.description[:100] + '...',
            })
    
    # Sort by match score and take top 3
    recommendations = sorted(recommendations, key=lambda x: x['match_score'], reverse=True)[:3]
    
    # Save result
    result = AssessmentResult.objects.create(
        student=request.user,
        scores=scores,
        recommended_careers=recommendations,
        answers=answers
    )
    
    return Response({
        'result_id': result.id,
        'scores': scores,
        'recommendations': recommendations,
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assessment_history(request):
    """Get student's assessment history."""
    results = AssessmentResult.objects.filter(student=request.user)
    serializer = AssessmentResultSerializer(results, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assessment_detail(request, pk):
    """Get specific assessment result."""
    try:
        result = AssessmentResult.objects.get(pk=pk, student=request.user)
        serializer = AssessmentResultSerializer(result)
        return Response(serializer.data)
    except AssessmentResult.DoesNotExist:
        return Response({'error': 'Result not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_stats(request):
    """Get admin statistics."""
    if not request.user.is_staff and request.user.role != 'admin':
        return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)
    
    total_students = AssessmentResult.objects.values('student').distinct().count()
    total_assessments = AssessmentResult.objects.count()
    career_distribution = {}
    
    for result in AssessmentResult.objects.all():
        for career in result.recommended_careers:
            career_name = career.get('name', 'Unknown')
            career_distribution[career_name] = career_distribution.get(career_name, 0) + 1
    
    return Response({
        'total_students': total_students,
        'total_assessments': total_assessments,
        'career_distribution': career_distribution,
    })