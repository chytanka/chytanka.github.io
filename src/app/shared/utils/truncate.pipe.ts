import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: false
})
export class TruncatePipe implements PipeTransform {

  transform(text: string, maxLength: number = 20): unknown {
    if (text.length <= maxLength) {
      return text;
  }

  const prefixLength = Math.floor((maxLength - 3) / 2);
  const suffixLength = maxLength - 3 - prefixLength;

  const truncatedText = text.substring(0, prefixLength) + '…' + text.substring(text.length - suffixLength);

  return truncatedText;
  }

}
