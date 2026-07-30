from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer to output public and authenticated user profile details."""

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "role",
            "max_documents",
            "max_storage_mb",
            "date_joined",
        )
        read_only_fields = (
            "id",
            "role",
            "max_documents",
            "max_storage_mb",
            "date_joined",
        )


class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for self-registration of new users."""

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(
        write_only=True, required=True, help_text="Password confirmation."
    )

    class Meta:
        model = User
        fields = ("username", "email", "password", "password2", "role")
        extra_kwargs = {
            "email": {"required": True},
            "role": {"required": False},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        role = validated_data.get("role", User.Role.APPRENANT)

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
            role=role,
        )
        return user