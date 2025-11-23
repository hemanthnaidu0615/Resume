import { useResume } from '../context/ResumeContext'
import { Button, Tooltip, Space, Typography } from 'antd'
import { UndoOutlined, RedoOutlined } from '@ant-design/icons'

const { Text } = Typography

export default function UndoRedoButtons({ showLabels = false }) {
  const { undo, redo, canUndo, canRedo } = useResume()

  return (
    <Space size={4}>
      <Tooltip title="Undo (Ctrl+Z)">
        <Button
          icon={<UndoOutlined />}
          onClick={undo}
          disabled={!canUndo}
          size="small"
        >
          {showLabels && <span className="hidden sm:inline ml-1">Undo</span>}
        </Button>
      </Tooltip>
      <Tooltip title="Redo (Ctrl+Shift+Z)">
        <Button
          icon={<RedoOutlined />}
          onClick={redo}
          disabled={!canRedo}
          size="small"
        >
          {showLabels && <span className="hidden sm:inline ml-1">Redo</span>}
        </Button>
      </Tooltip>
    </Space>
  )
}
