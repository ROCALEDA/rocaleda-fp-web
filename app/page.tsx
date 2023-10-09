import Image from 'next/image';

export default function Home() {
  return (
      <>
      <div style={{
          zIndex: -1,
          position: 'fixed',
          width: '100%',
          height: '100vh'
      }}>
      <Image
      src="/images/background.png"
      layout="fill"
      objectFit="cover"
      alt="Cloud Background Image"
      />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '4rem',
        justifyContent: 'center',
        height: '100vh',
        zIndex: 1,
        position: 'relative'
    }}>
        <h1>Pronto...</h1>
    </div>
      </>
  )
}