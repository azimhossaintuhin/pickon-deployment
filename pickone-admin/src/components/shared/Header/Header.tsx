'use client';
import Dropdown from './Dropdown';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/redux/api/authApi';
import { logout } from '@/redux/features/authSlice';
import Image from 'next/image';

const Header = () => {
    const [logoutMutation] = useLogoutMutation();

    const router = useRouter();

    const handleLogout = async () => {
        await logoutMutation({});
        logout();
        router.push('/login');
    };

    return (
        <header className=" py-3 px-6 rounded-bl-[8px] rounded-br-[8px]  text-black bg-white sticky top-0 left-0 right-0 z-50 ">
            <div className="flex justify-between items-center">
                <Image
                    src="/images/logo/ekhoni_kinbo_logo-trans.png"
                    alt="Ekhoni Kinbo Logo"
                    width={120}
                    height={40}
                    sizes="120px"
                    className="h-8 w-auto"
                />
                <div className="flex items-center space-x-14">
                    <Dropdown handleLogout={handleLogout} />
                </div>
            </div>
        </header>
    );
};

export default Header;
