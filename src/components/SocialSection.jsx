import { data } from '@/data/constant';
import { Box, Grid, Button, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material';

function SocialSection() {
  const renderButtons = () => {
    return data.socialLinks.map((item, index) => {
      const IconComponent = Icons[item.icon]; // Must match MUI icon name

      return (
        <Button
          key={index}
          component="a"
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={IconComponent ? <IconComponent /> : null}
          sx={{
            textTransform: 'none',
            border: '1px solid #7f8387ff',
            minWidth: { xs: 'fit-content'},
            px: { xs: 2, md: 3 },
            py: 1,
            borderRadius: "100vmax",
            color: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& .MuiButton-startIcon': {
              mr: { xs: "5px", md: 1 }, // remove gap on mobile
              ml: 0,
            },
            '&:hover': { backgroundColor: '#6a6c6dff', border: 'none' },
          }}
        >
          {/* Hide text on mobile */}
          <Typography
            component="span"
            // sx={{ display: { xs: 'none', md: 'inline',ml:'0' } }}
          >
            {item.label}
          </Typography>
        </Button>
      );
    });
  };

  return (
    <Grid container justifyContent="center" sx={{ width:"100%", mt: { xs: 2, sm: 4, md: 5 }, mb: { xs: 4, sm: 6, md: 8 } }}>
      <Grid item size={{ xs: 12, md: 12, lg: 12 }}>
        <Box
          sx={{
            width:"100%",
            display: 'flex',
            flexWrap: 'wrap',
            px:{xs:0, md:5},
            gap: { xs: 2, md: 3 },
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          {renderButtons()}
        </Box>
      </Grid>
    </Grid>
  );
}

export default SocialSection;
