from django.db import models
from django.conf import settings


class CareerPath(models.Model):
    """Career paths that students can be recommended to."""
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    required_skills = models.JSONField(default=list)
    growth_outlook = models.CharField(max_length=100)
    salary_range = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name


class Question(models.Model):
    """Assessment questions."""
    
    CATEGORY_CHOICES = [
        ('interests', 'Interests'),
        ('skills', 'Skills'),
        ('personality', 'Personality'),
        ('values', 'Values'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    question_text = models.TextField()
    options = models.JSONField(default=list)  # List of options with scores
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"{self.category}: {self.question_text[:50]}..."


class AssessmentResult(models.Model):
    """Student assessment results."""
    
    student = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='assessment_results'
    )
    scores = models.JSONField(default=dict)  # Category scores
    recommended_careers = models.JSONField(default=list)  # List of career paths
    answers = models.JSONField(default=dict)  # All answers submitted
    completed_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-completed_at']
    
    def __str__(self):
        return f"{self.student.username} - {self.completed_at.strftime('%Y-%m-%d')}"