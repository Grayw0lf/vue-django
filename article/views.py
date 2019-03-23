from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer


# Create your views here.
class ArticleViewset(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
