/** @type {import('next').NextConfig} */
import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', //当环境变量ANALYZE为true时开启
});
const nextConfig = {
  sassOptions: {
    additionalData: '@import "@/styles/index.scss";',
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https', //图片资源的协议
        hostname: 'i2.hdslb.com', //图片资源的域名
      },
    ],
  },
  //关闭严格模式
  reactStrictMode: false,
};

export default withBundleAnalyzer(nextConfig);
