import { useEffect, useState } from "react";
import { ToastNotification } from "visual/component/Notifications";
import { useConfig } from "visual/providers/ConfigProvider";
import { logout, sync } from "visual/utils/api";
import { t } from "visual/utils/i18n";

type Disconnect = {
  isDisconnect: boolean;
  loading: boolean;
  setDisconnect: () => void;
  error?: string;
};

export const useDisconnect = (): Disconnect => {
  const [isDisconnect, updateDisconnect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, updateError] = useState<string | undefined>(undefined);
  const config = useConfig();

  const setDisconnect = (): void => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      logout(config)
        .then((r) => {
          if (!r.success) {
            updateError(t("Something went wrong"));
            ToastNotification.error(t("Something went wrong"));
          } else {
            setLoading(false);
            updateDisconnect(true);
          }
        })
        .catch((e) => {
          setLoading(false);
          updateError(e);
          ToastNotification.error(t("Something went wrong"));
        });
    }
  }, [loading, config]);

  useEffect(() => {
    if (isDisconnect) {
      updateDisconnect(false);
    }
  }, [isDisconnect]);

  return { isDisconnect, error, loading, setDisconnect };
};

type Sync = {
  isSync: boolean;
  loading: boolean;
  setSync: () => void;
  error?: string;
};

export const useSync = (): Sync => {
  const [isSync, updateSync] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, updateError] = useState<string | undefined>(undefined);
  const config = useConfig();

  const setSync = (): void => {
    setLoading(true);
  };

  useEffect(() => {
    if (loading) {
      sync(config)
        .then((r) => {
          if (!r.success) {
            updateError(t("Unsuccessful sync"));
            ToastNotification.error(t("Unsuccessful sync"));
          } else {
            setLoading(false);
            updateSync(true);

            ToastNotification.success(t("Done, your library has synced"));
          }
        })
        .catch((e) => {
          setLoading(false);
          updateError(e);
          ToastNotification.error(t("Unsuccessful sync"));
        });
    }
  }, [loading, config]);

  return { isSync, error, loading, setSync };
};
