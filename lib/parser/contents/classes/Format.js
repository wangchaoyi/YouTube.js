'use strict';

const NToken = require('../../../deciphers/NToken');
const Signature = require('../../../deciphers/Signature');

class Format {
  constructor(data) {
    this.itag = data.itag;
    this.mime_type = data.mimeType;
    this.bitrate = data.bitrate;
    this.average_bitrate = data.averageBitrate;
    this.width = data.width || null;
    this.height = data.height || null;
    this.init_range = data.initRange && {
      start: parseInt(data.initRange.start),
      end: parseInt(data.initRange.end)
    };
    this.index_range = data.indexRange && {
      start: parseInt(data.indexRange.start),
      end: parseInt(data.indexRange.end)
    };
    this.last_modified = new Date(Math.floor(parseInt(data.lastModified) / 1000));
    this.content_length = parseInt(data.contentLength);
    this.quality = data.quality;
    this.quality_label = data.qualityLabel || null;
    this.fps = data.fps || null;
    this.url = data.url || null;
    this.cipher = data.cipher || null;
    this.signature_cipher = data.signatureCipher || null;
    this.audio_quality = data.audioQuality;
    this.approx_duration_ms = parseInt(data.approxDurationMs);
    this.audio_sample_rate = parseInt(data.audioSampleRate);
    this.audio_channels = data.audioChannels;
    this.loudness_db = data.loudnessDb;
    this.has_audio = !!data.audioBitrate || !!data.audioQuality;
    this.has_video = !!data.qualityLabel;
  }
  
  decipher(player) {
    this.url = this.url || this.signature_cipher || this.cipher;
    
    const args = new URLSearchParams(this.url);
    const url_components = new URL(args.get('url') || this.url);
    
    url_components.searchParams.set('ratebypass', 'yes');
    
    if (this.signature_cipher || this.cipher) {
      const signature = new Signature(this.url, player.signature_decipher).decipherBeta();
      
      args.get('sp') ?
        url_components.searchParams.set(args.get('sp'), signature) :
        url_components.searchParams.set('signature', signature);
    }
    
    if (url_components.searchParams.get('n')) {
      const ntoken = new NToken(player.ntoken_decipher, url_components.searchParams.get('n')).transform();
      url_components.searchParams.set('n', ntoken);
    }
    
    return url_components.toString();
  }
}

module.exports = Format;