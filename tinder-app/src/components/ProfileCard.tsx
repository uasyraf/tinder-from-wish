import React, { useEffect, useState } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

interface Profile {
    id: number;
    user_id: number;
    name: string;
    gender: string;
    location: string;
    university: string;
    interests: string;
}

interface ProfileCardProps {
    profile: Profile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(`https://robohash.org/robo/${profile.user_id}`);
                setAvatarUrl(response.config.url || '');
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
        };

        fetchAvatar();
    }, [profile.user_id]);

    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={avatarUrl} alt="Profile Avatar" />
            <Card.Body>
                <Card.Title>{profile.name}</Card.Title>
                <Card.Text>
                    {profile.gender} | {profile.location}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><strong>University:</strong> {profile.university}</ListGroupItem>
                <ListGroupItem><strong>Interests:</strong> {profile.interests}</ListGroupItem>
            </ListGroup>
        </Card>
    );
};

export default ProfileCard;
