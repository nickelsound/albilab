# Použijte oficiální Python 3.12 image jako základ
FROM python:3.12-slim

# Nastavte pracovní adresář v kontejneru
WORKDIR /app

# Zkopírujte soubor requirements.txt do pracovního adresáře
COPY requirements.txt .

# Nainstalujte Python závislosti
RUN pip install --no-cache-dir -r requirements.txt

# Zkopírujte zbytek aplikace do pracovního adresáře
COPY . .

# Nastavte proměnnou prostředí pro Flask
ENV FLASK_APP=albilab.py

# Exponujte port, na kterém Flask běží
EXPOSE 5000

# Příkaz pro spuštění aplikace
CMD ["flask", "run", "--host=0.0.0.0"]