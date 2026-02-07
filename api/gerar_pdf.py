from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from io import BytesIO
import json

def handler(request):

    body = request.get("body", "{}")
    data = json.loads(body)

    texto = data.get("texto", "Documento vazio")

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=A4)

    styles = getSampleStyleSheet()

    estilo = ParagraphStyle(
        "NormalCustom",
        parent=styles["Normal"],
        fontSize=12,
        textColor=colors.black
    )

    elementos = []

    elementos.append(Paragraph("Focoprime IA – Documento", styles["Title"]))
    elementos.append(Spacer(1, 20))
    elementos.append(Paragraph(texto, estilo))

    doc.build(elementos)

    pdf = buffer.getvalue()

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/pdf"
        },
        "body": pdf,
        "isBase64Encoded": False
    }
