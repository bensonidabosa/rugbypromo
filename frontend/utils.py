# from django.core.mail import EmailMultiAlternatives
# from django.template.loader import render_to_string
# from django.utils.html import strip_tags
# from django.conf import settings


# def send_html_email(subject, to_email, template_name, context=None, from_email=None):
#     """
#     Reusable function to send HTML email with text fallback.

#     :param subject: Email subject
#     :param to_email: Recipient email (string or list)
#     :param template_name: Path to HTML template
#     :param context: Dictionary context for template
#     :param from_email: Optional sender email
#     """

#     if context is None:
#         context = {}

#     if from_email is None:
#         from_email = settings.DEFAULT_FROM_EMAIL

#     # Render HTML content
#     html_content = render_to_string(template_name, context)

#     # Create plain text version
#     text_content = strip_tags(html_content)

#     # Ensure recipient is list
#     if isinstance(to_email, str):
#         to_email = [to_email]

#     # Create email
#     email = EmailMultiAlternatives(
#         subject=subject,
#         body=text_content,
#         from_email=from_email,
#         to=to_email,
#     )

#     email.attach_alternative(html_content, "text/html")
#     email.send()

#     return True

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from email.mime.image import MIMEImage
import os


def send_html_email(subject, to_email, template_name, context=None, from_email=None):
    if context is None:
        context = {}

    if from_email is None:
        from_email = settings.DEFAULT_FROM_EMAIL

    html_content = render_to_string(template_name, context)
    text_content = strip_tags(html_content)

    if isinstance(to_email, str):
        to_email = [to_email]

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=from_email,
        to=to_email,
    )

    email.attach_alternative(html_content, "text/html")

    # ✅ Attach logo as inline image
    logo_path = os.path.join(settings.BASE_DIR, "static/frontend/images/logo-main.png")

    if os.path.exists(logo_path):
        with open(logo_path, "rb") as f:
            logo = MIMEImage(f.read())
            logo.add_header("Content-ID", "<logo>")
            logo.add_header("Content-Disposition", "inline", filename="logo.png")
            email.attach(logo)

    email.send()

