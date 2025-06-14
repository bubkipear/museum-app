import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

function Header(){
    const navigate = useNavigate();
    return(
        <div>
            <button
            onClick={() => navigate('/')}
            className="text-secondary text-sm"
            >
            <div className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back
            </div>
            </button>
        </div>
    )
}

export default Header;
