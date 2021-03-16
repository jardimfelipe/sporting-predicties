import React from "react"

import { Row, Col, Typography } from "antd"
import { Box } from "@components"

const { Paragraph, Title } = Typography

export const About: React.FC = () => {
  return (
    <Row>
      <Col span={24}>
        <Box params={{ textAlign: "center" }}>
          <Title>Lorem Ipsum</Title>
        </Box>
      </Col>
      <Col span={24}>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut facilisis
          rhoncus neque. Sed varius id metus at interdum. Pellentesque viverra
          sagittis dictum. Donec id odio eros. Suspendisse ut ornare lorem.
          Donec sed mi vehicula, scelerisque sapien ac, luctus ex. Aliquam erat
          volutpat. Aenean tempus sapien erat, eu placerat sapien congue mollis.
          Morbi id convallis libero, eget sodales ante. Vivamus finibus enim non
          velit fringilla, non eleifend eros fringilla.
        </Paragraph>
        <Paragraph>
          Donec tincidunt neque tincidunt odio hendrerit varius. Duis in mattis
          arcu, nec laoreet nisl. Sed pharetra, nibh in mattis posuere, leo odio
          consectetur lectus, sed facilisis enim nibh a lacus. Sed egestas id
          tellus id mattis. Suspendisse ante turpis, dapibus id rutrum vel,
          rhoncus a nunc. Fusce blandit posuere ultricies. Nam aliquet ex eget
          mollis tincidunt. Etiam quam urna, tempus id turpis in, mattis maximus
          odio. Donec odio mauris, varius ut nulla et, sodales blandit risus.
        </Paragraph>
      </Col>
    </Row>
  )
}
