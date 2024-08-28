import style from './style.module.scss';

export default async function ScssDemo() {
  return (
    <>
      <div className={style.title}>标题</div>
      <div style={{ color: style.primaryColor }}>描述文字</div>
    </>
  );
}
