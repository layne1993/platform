/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { format } from 'silly-datetime';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { extname } from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class ToolsService {
  getTime() {
    const d = new Date();
    return d.getTime();
  }

  getDay() {
    const day = format(new Date(), 'YYYYMMDD');
    return day;
  }

  async uploadFile(file): Promise<any> {
    return new Promise((resolve, reject) => {
      if (file) {
        // 获取当前日期
        const day = this.getDay();
        const d = this.getTime();

        // 根据日期创建目录
        const dir = path.join(__dirname, '../../../public/upload', day);
        mkdirp.sync(dir);
        const uploadDir = path.join(dir, d + extname(file.originalname));

        // 实现上传
        const writeImage = createWriteStream(uploadDir);
        writeImage.write(file.buffer);
        writeImage.end();
        writeImage.on('finish', () => {
          // 4、返回图片保存的地址
          const saveDir = path.join(
            'upload',
            day,
            d + extname(file.originalname),
          );
          resolve({
            saveDir,
            uploadDir,
          });
        });
      } else {
        resolve({
          saveDir: '',
          uploadDir: '',
        });
      }
    });
  }

  async uploadFiles(files): Promise<any> {
    return new Promise((resolve, reject) => {
      if (files && files.length) {
        // 获取当前日期
        const day = this.getDay();
        const d = this.getTime();

        // 根据日期创建目录
        const dir = path.join(__dirname, '../../../public/upload', day);
        mkdirp.sync(dir);

        const saveDirs = [];
        for (const file of files) {
          const uploadDir = path.join(dir, d + extname(file.originalname));

          // 实现上传
          const writeImage = createWriteStream(uploadDir);
          writeImage.write(file.buffer);
          writeImage.end();
          writeImage.on('finish', () => {
            // 4、返回图片保存的地址
            const saveDir = path.join(
              'upload',
              day,
              d + extname(file.originalname),
            );
            saveDirs.push({
              uploadDir,
              saveDir,
            });
          });
        }
        resolve(saveDirs);
      } else {
        resolve([]);
      }
    });
  }
}
