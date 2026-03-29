from django.contrib import admin
from .models import CareerPath, Question, AssessmentResult

@admin.register(CareerPath)
class CareerPathAdmin(admin.ModelAdmin):
    list_display = ['name', 'growth_outlook', 'salary_range']
    search_fields = ['name']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'category', 'order', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['question_text']

@admin.register(AssessmentResult)
class AssessmentResultAdmin(admin.ModelAdmin):
    list_display = ['student', 'completed_at']
    list_filter = ['completed_at']
    search_fields = ['student__username']