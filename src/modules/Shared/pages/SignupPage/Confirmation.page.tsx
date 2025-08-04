import { Link, useLocation, useNavigate } from "react-router-dom";
import Card, { CardBody, CardHeader, CardSubTitle, CardTitle } from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import Icon from "../../../../components/icon/Icon";
import { useLayoutEffect } from "react";

export default function ConfirmationPage() {
    const { state } = useLocation();

    useLayoutEffect(() => {
        if (!state?.email) {
            window.location.href = '/signup';
        }
    }, [state]);
    
    if (!state?.email) {
        return null; // or a loading spinner, or redirect to a different page
    }

    return (
        <div className="flex min-h-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
            <Card className="w-full max-w-lg text-center">
                <CardHeader >
                    <CardTitle className="text-3xl !mx-auto font-bold">Check Your Email</CardTitle>
                </CardHeader>
                <CardBody className="space-y-4">
                    <div className="flex justify-center">
                        <Icon className="text-7xl " color="blue" icon="HeroCheckCircle" />
                    </div>
                    <CardSubTitle>
                        A verification link has been sent to {state.email}. Please check your inbox (and spam folder) to verify
                        your account.
                    </CardSubTitle>
                    <Button className="w-full">
                        <Link className="font-semibold" to="/signin">Go to Login</Link>
                    </Button>
                    <Button variant="solid">
                        Resend Verification Email
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
}