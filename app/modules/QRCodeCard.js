import { html, useRef, useEffect } from '../libs/preact.js';
import { i18n } from '../utils.js';
import QRCode from '../libs/qrcode.js';

// QR code card configuration
const config = {
    width: 860,
    height: 120,
    qrCodeSize: 90,
    padding: 15,
    titleFontSize: 24,
    titleFontFamily: '"Microsoft YaHei", sans-serif',
    titleFontColor: '#A0BDFE', // Light blue color for title
    urlFontSize: 20,
    urlFontFamily: 'Arial, sans-serif',
    urlFontColor: '#E0E0E0',
    textMaxWidth: 720, // Width available for text with QR on right
    backgroundColor: '#445271', // Rich navy blue background
    borderRadius: 10
};

// Helper function to draw rounded rectangle
const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
};

// Function to truncate text with ellipsis
const truncateText = (ctx, text, maxWidth, fontSize, isTitle = false) => {
    // Set the appropriate font for measurement
    ctx.font = isTitle
        ? `bold ${fontSize}px ${config.titleFontFamily}`
        : `${fontSize}px ${config.urlFontFamily}`;
    
    if (ctx.measureText(text).width <= maxWidth) {
        return text;
    }
    
    let truncated = text;
    while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
        truncated = truncated.slice(0, -1);
    }
    
    return truncated + '...';
};

const QRCodeCard = ({ url, title }) => {
    const canvasRef = useRef(null);

    // Generate QR code card
    const generateQRCodeCard = (ctx) => {
        // Clear canvas
        ctx.clearRect(0, 0, config.width, config.height);
        
        // Draw rounded rectangle background
        ctx.fillStyle = config.backgroundColor;
        drawRoundedRect(ctx, 0, 0, config.width, config.height, config.borderRadius);
        ctx.fill();
        
        // Generate QR code
        QRCode.toDataURL(url, {
            width: config.qrCodeSize,
            margin: 0,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        })
        .then(qrDataUrl => {
            const qrImage = new Image();
            qrImage.onload = () => {
                // Calculate QR code position (right side)
                const qrCodeX = config.width - config.padding - config.qrCodeSize;
                
                // Create a rounded rectangle for the QR code background
                const qrRadius = 8;
                ctx.fillStyle = '#ffffff';
                drawRoundedRect(ctx, qrCodeX, config.padding, config.qrCodeSize, config.qrCodeSize, qrRadius);
                ctx.fill();
                
                // Draw QR code onto canvas
                ctx.drawImage(qrImage, qrCodeX, config.padding, config.qrCodeSize, config.qrCodeSize);
                
                // Draw title with truncation
                if (title) {
                    const truncatedTitle = truncateText(
                        ctx, 
                        title, 
                        config.textMaxWidth, 
                        config.titleFontSize, 
                        true
                    );
                    ctx.fillStyle = config.titleFontColor;
                    ctx.font = `bold ${config.titleFontSize}px ${config.titleFontFamily}`;
                    ctx.fillText(truncatedTitle, config.padding, config.padding + 35);
                }
                
                // Draw URL with truncation
                const truncatedUrl = truncateText(
                    ctx, 
                    url, 
                    config.textMaxWidth, 
                    config.urlFontSize
                );
                ctx.font = `${config.urlFontSize}px ${config.urlFontFamily}`;
                ctx.fillStyle = config.urlFontColor;
                ctx.fillText(truncatedUrl, config.padding, title ? config.padding + 75 : config.padding + 50);
            };
            
            qrImage.src = qrDataUrl;
        })
        .catch(error => {
            console.error('Error generating QR code:', error);
        });
    };

    // Initialize canvas and draw when props change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !url) return;

        const ctx = canvas.getContext('2d');
        generateQRCodeCard(ctx);
    }, [url, title]);

    return html`
        <div class="qrcode-card-container">
            <canvas 
                ref=${canvasRef}
                width=${config.width}
                height=${config.height}
                style="max-width: 100%; height: auto; border-radius: 8px;"
            />
            <div class="qrcode-hint">
                ${i18n('qrcode_hint_text')}
            </div>
        </div>
    `;
};

export default QRCodeCard;