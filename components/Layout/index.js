import Navbar from '../Navbar';

export default function Layout({ children }) {
  return (
    <div style={{minHeight: '1024px'}}>
      <Navbar />
      <div className="content-wrap">{children}</div>
    </div>
  );
}
