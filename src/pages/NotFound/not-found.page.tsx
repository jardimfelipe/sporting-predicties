import React from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"

import { Result, Button } from "antd"

export const NotFound: React.FC = () => {
  const { t } = useTranslation()
  const history = useHistory()
  return (
    <Result
      status="404"
      title="404"
      subTitle={t("notFound")}
      extra={
        <Button onClick={() => history.push("/")} type="primary">
          {t("button.backHome")}
        </Button>
      }
    />
  )
}
