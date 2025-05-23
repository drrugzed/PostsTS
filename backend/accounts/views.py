from rest_framework import generics, permissions  # Один импорт
from .serializers import RegisterSerializer  # Сериализатор для регистрации


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]  # Явно разрешаем доступ

