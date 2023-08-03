import React from 'react';
import { Alert, Space, Button } from 'antd';

const ErrorMessage = ({message}: {message: string}) => {
    const reload = (e: any) => {
        window.location.reload();
    }
    return (
        <Space direction="vertical">
            <Alert message={message} type="error" />
            <Button onClick={reload}>Reload Page</Button>
        </Space>
    )
}

export default ErrorMessage;