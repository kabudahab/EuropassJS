# EuropassJS

An automatic tool to generate a PDF Curriculum Vitae (CV) from an Europass CV in XML format.



## How it works

1. Personal data are saved as Europass CV in XML format
2. Europass CV in XML format is converted to in Europass CV in JSON format via Europass REST API (http://interop.europass.cedefop.europa.eu/web-services/rest-api-reference/#xml-to-json).
3. HTML is generated from the Europass CV in JSON format using mustache templates.
4. Finally, the hTML output is rendered as PDF using wkhtmltopdf 0.9.9 



## Requirements

* cURL (http://curl.haxx.se/).
* Node.js (https://nodejs.org/).
* Wkhtmltopdf version 0.9.9 (http://wkhtmltopdf.org/).



## Installation

* Install cURL
```bash
sudo apt-get curl
```
* Install Node.js
```bash
sudo apt-get nodejs
```
* Install Wkhtmltopdf
```bash
sudo apt-get wkhtmltopdf
```



## How to use

1. Create your Europass CV online via https://europass.cedefop.europa.eu/editors/en/cv/compose
2. Download your Europass CV in Europass CV XML format.
3. Save your Europass CV XML file to `./Data files/Europass-cv.xml`.
4. Edit skill profile JSON file `./Data files/Skills.json`.
5. Run `./1-xml-to-json.sh` to convert Europass CV XML file to JSON.
6. Run `./2-json-to-html.sh` to generate HTML from JSON.
7. Run `./3-html-to-pdf.sh` to generate the CV PDF file.
8. View PDF file `./Data files/cv.pdf`.



## Credits

HTML template is based on a Free Responsive HTML/CSS3 CV Template of 
Thomas Hardy (http://www.thomashardy.me.uk/free-responsive-html-css3-cv-template).








