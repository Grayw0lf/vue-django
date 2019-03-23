from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewset
from django.views.generic import TemplateView


router = DefaultRouter()
router.register('article', ArticleViewset, basename='article')

app_name = 'article'
urlpatterns = [
    path('api/', include(router.urls)),
    path('article/', TemplateView.as_view(template_name='base.html')),
]
