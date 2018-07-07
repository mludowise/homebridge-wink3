import { batteryService } from "./_shared";

export default ({ Characteristic, Service }) => {
  return {
    type: "door_bell",
    group: "door_bells",
    services: [
      {
        service: Service.Doorbell,
        supported: state => state.button_pressed !== undefined,
        characteristics: [
          {
            characteristic: Characteristic.ProgrammableSwitchEvent,
            get: state => (state.button_pressed ? 0 : null)
          }
        ]
      },
      {
        service: Service.MotionSensor,
        supported: state => state.motion !== undefined,
        characteristics: [
          {
            characteristic: Characteristic.MotionDetected,
            get: state => state.motion
          }
        ]
      },
      batteryService({
        Characteristic,
        Service,
        notCharging: true
      })
    ]
  };
};
