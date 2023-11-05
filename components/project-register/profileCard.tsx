import { Card, CardContent, Typography, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ProfileCardProps {
    profile: {
        profileName: string;
        techSkills: string[];
        softSkills: string[];
        numberOfProfiles: number;
    };
    onEdit: (profile: {
        profileName: string;
        techSkills: string[];
        softSkills: string[];
        numberOfProfiles: number;
    }) => void;
    onDelete: (profileName: string) => void;
}


const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit, onDelete }) => {
    const { profileName, techSkills, softSkills } = profile;


    return (
        <Card elevation={1} style={{ marginBottom: '10px', marginTop: '20px' }}>
            <CardContent style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>{profileName}</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'left',alignItems: 'center', marginBottom: '10px', marginLeft: '30px' }}>
                {techSkills.map(skill => (
            <Chip label={skill} style={{ marginRight: '5px', marginBottom: '5px' }} key={skill} />
                ))}
            </div>
    
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'left',alignItems: 'center', marginLeft: '30px' }}>
                {softSkills.map(skill => (
                <Chip label={skill} style={{ marginRight: '5px', marginBottom: '5px' }} key={skill} />
                ))}
            </div>
            </div>

                <div>
                    <IconButton onClick={() => onEdit(profile)} aria-label="edit">
                        <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => onDelete(profileName)} aria-label="delete">
                        <DeleteIcon color="error" />
                    </IconButton>
                </div>

            </CardContent>
        </Card>
    )
}

export default ProfileCard;