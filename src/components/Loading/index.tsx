import { Row, Col, Spin, Space, Progress, Typography } from "antd";
const { Title } = Typography;

const calculateProgress = (current: number, total: number) =>
  Math.round((100 * current) / total);

interface LoadingProps {
  progress: number;
  totalProgress: number;
}

const Loading = ({ progress, totalProgress }: LoadingProps) => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Space align="center" direction="vertical" size="large">
          <Spin size="large" />
          <Title level={4}>Creating board...</Title>
        </Space>
        <Progress
          percent={calculateProgress(progress, totalProgress)}
          status="active"
        />
      </Col>
    </Row>
  );
};

export default Loading;
