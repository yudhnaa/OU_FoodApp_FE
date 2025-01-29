import React, {createContext, useState, useEffect, useContext} from 'react';
import {
    getStringValue,
    storeStringValue,
    removeValue,
    getObjectValue,
    storeObjectValue
} from '@/components/asyncStorage';

// Tạo Context
const AuthContext = createContext<any>(null);

type OAuth2Token = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    date: Date;
}

type location = {
    longitude: number;
    latitude: number;
}

// Tạo Provider
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [oauth2Token, setOauth2Token] = useState<OAuth2Token | null>(null);
    const [access_token, setAccess_token] = useState<string | null>(null);
    const [location, setLocation] = useState<location>({longitude: 0, latitude: 0});
    const [loading, setLoading] = useState<boolean>(true);

    // Lấy oauth2-token từ AsyncStorage khi app khởi chạy
    useEffect(() => {
        const loadToken = async () => {
            try {
                let oauth2 = await getObjectValue('oauth2-token').then((res) => {
                    if (res) {
                        setOauth2Token( {
                            access_token: res.access_token,
                            refresh_token: res.refresh_token,
                            expires_in: res.expires_in,
                            token_type: res.token_type,
                            scope: res.scope,
                            date: res.date
                        })
                    }
                    setAccess_token(res.access_token);
                });
            } catch (error) {
                console.log('Không load được oauth2-token:', error);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    // Hàm lưu oauth2-token vào AsyncStorage
    const saveOauth2Token = async (newOauth2Token: OAuth2Token) => {
        try {
            // console.log('Lưu oauth2-token:', newOauth2Token);
            await storeObjectValue('oauth2-token', newOauth2Token);
            setOauth2Token({
                ...newOauth2Token,
                date: new Date()
            });

            setAccess_token(newOauth2Token.access_token);
        } catch (error) {
            console.error('Không lưu được oauth2-token:', error);
        }
    };

    // Hàm xóa oauth2-token khỏi AsyncStorage
    const clearToken = async () => {
        try {
            await removeValue('oauth2-token');
            setAccess_token(null);
        } catch (error) {
            console.error('Không xóa được oauth2-token:', error);
        }
    };

    const resetAuthContext = () => {
        setOauth2Token(null);
        setAccess_token(null);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{access_token, oauth2Token, saveOauth2Token, clearToken, loading, resetAuthContext, location, setLocation}}>
            {children}
        </AuthContext.Provider>
    );
};



// Custom hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);