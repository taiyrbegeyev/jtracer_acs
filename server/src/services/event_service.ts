import QRCode from 'qrcode';

class EventService {
  async generateQRCode(eventName: string) {
    return QRCode.toDataURL(eventName);
  }
}

export default new EventService();
