import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Divider, Typography} from "@mui/material";
import Chip from "@mui/material/Chip";
import {HourglassBottomOutlined, Schedule} from "@mui/icons-material";
import Grid from "@mui/material/Grid";

type ModuleItemProps = {
  title: string,
  description: string,
  status: string,
  notes: string
}
const ModuleItem = (props: ModuleItemProps) => {

  const showLabel = (status: string) => {
    if (status == "C") {
      return (
          <Chip variant="outlined" color="success" icon={<Schedule/>} label="Completed"></Chip>
      );
    } else if (status == "A") {
      return (
          <Chip variant="outlined" color="info" icon={<Schedule/>} label="Active Development"></Chip>
      );
    } else if (status == "N") {
      return (
          <Chip variant="outlined" icon={<Schedule/>} label="Planned"></Chip>
      );
    } else if (status == "U") {
      return (
          <Chip variant="outlined" icon={<HourglassBottomOutlined/>} label="Feasibility Pending"></Chip>
      );
    }
  }

  return (
      <Grid item xs={4}>
        <Card sx={{minWidth: 275}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {props.title}
            </Typography>
            <Typography variant="body2">
              {props.description}
            </Typography>
            <Divider style={{marginTop: 10, marginBottom: 10}}/>
            {showLabel(props.status)}
            <Typography sx={{mb: 0, mt: 2, fontSize: 10}} color="text.secondary">
              {props.notes}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
  );
}

export default ModuleItem;
