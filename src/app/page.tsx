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
        src="https://i2.hdslb.com/bfs/archive/6d99349f16e5f5c41bfdd328c768f8f29bbf51f5.jpg"
        alt="Vercel Logo"
        className="dark:invert"
        width={475}
        height={295}
        priority
      />
    </main>
  );
}
