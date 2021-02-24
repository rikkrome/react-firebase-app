import React, { useRef, useEffect } from 'react'
import Alert from '../../components/Alert';
import { useSelector } from '../Store';
import { Modal } from 'bootstrap';
import useSystemActions from './useSystemActions';

const SystemAlert = () => {
    const { alerts } = useSelector((state: any) => state.system);
    const modalRef: any = useRef(null);
    const { ClearAllAlerts } = useSystemActions();
    useEffect(() => {
        if (modalRef && modalRef.current && modalRef.current && alerts && Array.isArray(alerts) && alerts.length) {
            const myModal = new Modal(modalRef.current)
            myModal.show();
        }
    }, [alerts, alerts.length])

    useEffect(() => {
        modalRef?.current?.addEventListener('hidden.bs.modal', function () {
            ClearAllAlerts();
        })
    }, [ClearAllAlerts])

    const modal = (
        <div ref={modalRef} className="modal fade" id="alertModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-body">
                        {alerts && Array.isArray(alerts) ? alerts.map((item, index) => {
                            const { text, type } = item || {};
                            return (
                                <div key={`${index}`} className="row">
                                    <div className="col">
                                        <Alert text={text} type={type} />
                                    </div>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="position-absolute top-0 end-0 container-fluid">
            {modal}
        </div>
    )
}

export default SystemAlert
