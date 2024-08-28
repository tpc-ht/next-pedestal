import Link from 'next/link';
import Image from 'next/image';
import { Button, Space } from 'antd';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Space>
        <Button>
          <Link href="/scss-demo">scss Demo</Link>
        </Button>
        <Button>
          <Link href="/store-demo">store Demo</Link>
        </Button>
        <Button>
          <Link href="/styled-components-demo">styledComponents Demo</Link>
        </Button>
      </Space>

      <h1>我是首页</h1>
      <Image src="/vercel.svg" alt="Vercel Logo" className="dark:invert" width={100} height={24} priority />
      <Image
        src="https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/861d4b4c9f7f450ca4ed3075ee0fdde4~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pWy5Luj56CB55qE5b2t5LqO5pmP:q75.awebp?rk3s=f64ab15b&x-expires=1725355153&x-signature=75MA%2BvdGLUB0JDp19oSyxhQYdp4%3D"
        alt="Vercel Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </main>
  );
}
