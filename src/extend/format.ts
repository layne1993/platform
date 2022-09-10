import { format } from 'silly-datetime';
import { extname } from 'path';

export class FormatHelper {
  static formatTime(params) {
    return format(params, 'YYYY-MM-DD HH:mm');
  }

  static formatImg(dir, width, height) {
    height = height || width;
    return dir + '_' + width + 'x' + height + extname(dir);
  }
}
