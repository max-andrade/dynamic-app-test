import React from 'react';
import { Ionicons, FontAwesome, Entypo, MaterialIcons } from '@expo/vector-icons';

export const Icons = {
    menu: props => <Ionicons name="md-menu" size={32} {...props} />,
    signOut: props => <Ionicons name="md-log-out" size={24} {...props} />,
    documents: props => <Entypo name="documents" size={24} {...props} />,
    document: props => <Ionicons name="ios-document" {...props} />,
    user: props => <FontAwesome name="user" {...props} />,
    calendar: props => <Ionicons name="md-calendar" {...props} />,
    info: props => <Ionicons name="md-information-circle" size={24} {...props} />,
    liveHelp: props => <MaterialIcons name="live-help" size={24} {...props} />,
    feedback: props => <MaterialIcons name="feedback" size={24} {...props} />,
}