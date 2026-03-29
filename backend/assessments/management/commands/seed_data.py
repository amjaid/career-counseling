from django.core.management.base import BaseCommand
from assessments.models import CareerPath, Question


class Command(BaseCommand):
    help = 'Seed initial data for the career counseling system'

    def handle(self, *args, **kwargs):
        # Create Career Paths
        careers = [
            {'name': 'Software Engineering', 'description': 'Design, develop, and maintain software applications. Work with various programming languages and frameworks to create efficient solutions.', 'required_skills': ['programming', 'problem-solving', 'logic'], 'growth_outlook': 'Very High', 'salary_range': '$60k - $150k'},
            {'name': 'Data Science', 'description': 'Analyze complex data to help organizations make better decisions. Use statistics, machine learning, and programming to extract insights.', 'required_skills': ['analysis', 'statistics', 'programming'], 'growth_outlook': 'Very High', 'salary_range': '$70k - $160k'},
            {'name': 'Web Development', 'description': 'Build websites and web applications. Focus on both frontend and backend development using modern technologies.', 'required_skills': ['programming', 'design', 'creativity'], 'growth_outlook': 'High', 'salary_range': '$50k - $120k'},
            {'name': 'Mobile App Development', 'description': 'Create applications for iOS and Android devices. Work with mobile frameworks and APIs.', 'required_skills': ['programming', 'mobile', 'UI/UX'], 'growth_outlook': 'High', 'salary_range': '$55k - $130k'},
            {'name': 'Machine Learning/AI', 'description': 'Build intelligent systems that can learn and make predictions. Work with neural networks and deep learning.', 'required_skills': ['programming', 'math', 'algorithms'], 'growth_outlook': 'Very High', 'salary_range': '$80k - $180k'},
            {'name': 'Cybersecurity', 'description': 'Protect systems and networks from cyber threats. Implement security measures and respond to incidents.', 'required_skills': ['security', 'networking', 'problem-solving'], 'growth_outlook': 'Very High', 'salary_range': '$65k - $140k'},
            {'name': 'Cloud Computing', 'description': 'Design and manage cloud infrastructure. Work with platforms like AWS, Azure, and Google Cloud.', 'required_skills': ['networking', ' DevOps', 'programming'], 'growth_outlook': 'Very High', 'salary_range': '$70k - $150k'},
            {'name': 'UI/UX Design', 'description': 'Create user-friendly interfaces and experiences. Focus on usability, aesthetics, and user research.', 'required_skills': ['design', 'creativity', 'research'], 'growth_outlook': 'High', 'salary_range': '$50k - $120k'},
        ]

        for career in careers:
            CareerPath.objects.get_or_create(name=career['name'], defaults=career)

        self.stdout.write(self.style.SUCCESS(f'Created {len(careers)} career paths'))

        # Create Questions
        questions_data = [
            # Interests
            {'category': 'interests', 'question_text': 'I enjoy solving complex problems and puzzles', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 1},
            {'category': 'interests', 'question_text': 'I like working with numbers and data analysis', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 2},
            {'category': 'interests', 'question_text': 'I enjoy designing and creating visual content', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 3},
            {'category': 'interests', 'question_text': 'I am interested in how technology can help people', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 4},
            {'category': 'interests', 'question_text': 'I enjoy learning about new technologies', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 5},
            # Skills
            {'category': 'skills', 'question_text': 'I am good at programming or coding', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 6},
            {'category': 'skills', 'question_text': 'I have strong analytical and logical thinking skills', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 7},
            {'category': 'skills', 'question_text': 'I am good at communicating complex ideas simply', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 8},
            {'category': 'skills', 'question_text': 'I have experience with databases and data management', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 9},
            {'category': 'skills', 'question_text': 'I am comfortable working with mathematics and statistics', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 10},
            # Personality
            {'category': 'personality', 'question_text': 'I prefer working independently rather than in teams', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 11},
            {'category': 'personality', 'question_text': 'I am detail-oriented and thorough in my work', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 12},
            {'category': 'personality', 'question_text': 'I enjoy taking on challenges and learning new things', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 13},
            {'category': 'personality', 'question_text': 'I am patient and persistent when solving problems', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 14},
            {'category': 'personality', 'question_text': 'I work well under pressure and tight deadlines', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 15},
            # Values
            {'category': 'values', 'question_text': 'Making a positive impact on society is important to me', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 16},
            {'category': 'values', 'question_text': 'Work-life balance is a priority for me', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 17},
            {'category': 'values', 'question_text': 'High earning potential is important in my career', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 18},
            {'category': 'values', 'question_text': 'I want to continuously learn and develop new skills', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 19},
            {'category': 'values', 'question_text': 'Job security is very important to me', 'options': [{'text': 'Strongly Disagree', 'score': 1}, {'text': 'Disagree', 'score': 2}, {'text': 'Neutral', 'score': 3}, {'text': 'Agree', 'score': 4}, {'text': 'Strongly Agree', 'score': 5}], 'order': 20},
        ]

        for q in questions_data:
            Question.objects.get_or_create(question_text=q['question_text'], category=q['category'], defaults=q)

        self.stdout.write(self.style.SUCCESS(f'Created {len(questions_data)} questions'))
        self.stdout.write(self.style.SUCCESS('Seeding complete!'))