from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser): 
    class Role(models.TextChoices):
        APPRENANT = "APPRENANT", "Apprenant"
        ADMINISTRATEUR = "ADMINISTRATEUR", "Administrateur"
        
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.APPRENANT,
        help_text="User role within the platform"
    )
    max_documents = models.PositiveBigIntegerField(
        default=10,
        help_text="Maximum number of PDF documents allowed for this user.",
    )
    max_storage_mb = models.PositiveIntegerField(
        default=100,
        help_text="Maximum total storage volume in MB allowed for this user.",
    )
        
    @property
    def is_admin_user(self):
        return self.role == self.Role.ADMINISTRATEUR or self.is_superuser
    
    def __str__(self): 
        return f"{self.username} ({self.role})"