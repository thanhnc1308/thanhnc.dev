import crypto from 'crypto';

const hash = (str: string) => {
  return crypto.createHash('md5').update(str).digest('hex');
};

export { hash };
