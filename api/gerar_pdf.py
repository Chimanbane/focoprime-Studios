from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from io import BytesIO

def handler(request):
    data = request.get_json()
    texto = data.get("texto", "Sem conteúdo")

    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    y = height - 40
    for linha in texto.split("\n"):
        pdf.drawString(40, y, linha)
        y -= 14
        if y < 40:
            pdf.showPage()
            y = height - 40

    pdf.save()
    buffer.seek(0)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=focoprime.pdf"
        },
        "body": buffer.getvalue(),
        "isBase64Encoded": False
    }
