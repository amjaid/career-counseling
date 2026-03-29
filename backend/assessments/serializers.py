from rest_framework import serializers
from .models import CareerPath, Question, AssessmentResult


class CareerPathSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPath
        fields = ['id', 'name', 'description', 'required_skills', 'growth_outlook', 'salary_range']


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'category', 'question_text', 'options', 'order', 'is_active']


class AssessmentResultSerializer(serializers.ModelSerializer):
    student_username = serializers.CharField(source='student.username', read_only=True)
    
    class Meta:
        model = AssessmentResult
        fields = ['id', 'student', 'student_username', 'scores', 'recommended_careers', 'answers', 'completed_at']


class AssessmentSubmitSerializer(serializers.Serializer):
    answers = serializers.JSONField()  # {question_id: option_index}
    
    def validate_answers(self, value):
        if not value:
            raise serializers.ValidationError("Answers cannot be empty")
        return value