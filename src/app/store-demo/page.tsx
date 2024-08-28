'use client';
import { Button, Space } from 'antd';
import { useUserStore } from '@/store';

export default function StoreDemo() {
  const { userInfo, token, updateUserInfo, updateAge, updateToken } = useUserStore();
  return (
    <main className="p-24">
      <h1>StoreDemo</h1>
      <div>
        姓名：{userInfo.name} 年龄：{userInfo.age}
      </div>
      <div>token：{token}</div>
      <Space></Space>
      <Button onClick={() => updateUserInfo({ name: 'lisi', age: 24 })}>更新用户</Button>
      <Button onClick={() => updateAge(userInfo.age + 1)}>更新年龄</Button>
      <Button onClick={() => updateToken('23652')}>更新token</Button>
    </main>
  );
}
