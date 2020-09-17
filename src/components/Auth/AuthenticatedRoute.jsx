import React, { useState, useEffect } from 'react';
import  { canAccess } from '../../auth';

export default function AuthenticatedRoute(AuthComponent, requestedRoles) {
    return class Authenticated extends React.Component  {
        constructor(props) {
            super(props);
            this.state = {
                isLoading: true,
                isAuthorized: false
            };
        }

        componentDidMount() {
            this.setState({ isLoading: false, isAuthorized: canAccess(requestedRoles) });
        }

        render() {
            const { isLoading, isAuthorized } = this.state;
            return (
                <>
                    { isLoading ? (
                        <>
                            {/* //TODO Criar tela de loading */}
                        </>
                    ) : (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        isAuthorized ? (
                            <AuthComponent {...this.props} />
                        ) : (
                            <span>Não permitido</span>
                        )
                    )}
                </>
            );
        }
    };
}
