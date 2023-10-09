import Image from 'next/image'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';

export default function page() {
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
        <CloudOutlinedIcon color="primary" fontSize="large" />
        <h1>Register</h1>
        </>
    )
}