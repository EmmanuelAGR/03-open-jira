import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

interface Props {
  items: string[];
}

export const SidebarItems = ({ items }: Props): JSX.Element => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>
            {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};
