# Images Directory

This directory contains diagram files used in the project documentation.

## SVG to PNG Conversion

Some platforms may not render SVG files correctly. To convert the SVG files to PNG:

### Option 1: Online Conversion

1. Use an online SVG to PNG converter such as:
   - [SVG2PNG](https://svgtopng.com/)
   - [Convertio](https://convertio.co/svg-png/)
   - [CloudConvert](https://cloudconvert.com/svg-to-png)

2. Upload the SVG file from this directory
3. Download the converted PNG file
4. Save it to this directory with the same base filename

### Option 2: Using Browser

1. Open the SVG file in a web browser
2. Right-click on the image and select "Save Image As..."
3. Choose PNG as the format
4. Save to this directory with the same base filename

### Option 3: Command Line (with Inkscape)

If you have Inkscape installed:

```bash
inkscape -w 800 -h 600 architecture.svg -o architecture.png
inkscape -w 800 -h 600 data-flow.svg -o data-flow.png
inkscape -w 800 -h 600 strategy-flow.svg -o strategy-flow.png
```

### Option 4: Using Node.js

You can use a Node.js package to convert the files:

```bash
# Install svg-to-png globally
npm install -g svg-to-png

# Convert SVG files to PNG
svg-to-png public/images/*.svg public/images/
```

## Diagram Files

- `architecture.svg` - System architecture diagram
- `data-flow.svg` - Data flow diagram
- `strategy-flow.svg` - Strategy builder workflow diagram 