from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'careers', views.CareerPathViewSet, basename='careers')
router.register(r'questions', views.QuestionViewSet, basename='questions')

urlpatterns = [
    path('assessments/submit/', views.submit_assessment, name='submit_assessment'),
    path('assessments/history/', views.assessment_history, name='assessment_history'),
    path('assessments/<int:pk>/', views.assessment_detail, name='assessment_detail'),
    path('admin/stats/', views.admin_stats, name='admin_stats'),
] + router.urls