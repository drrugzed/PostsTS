from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Разрешено всем — только читать (GET, HEAD, OPTIONS)
        if request.method in permissions.SAFE_METHODS:
            return True
        # А редактировать/удалять — только если автор
        return obj.author == request.user