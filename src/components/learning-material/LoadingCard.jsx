import { Card, CardContent, CardActions, Box, Skeleton } from "@mui/material";

export default function LoadingCard() {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      {/* Colored header bar */}
      <Box sx={{ bgcolor: "grey.300", height: 6 }} />

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Icon + Title */}
        <Box display="flex" alignItems="center" mb={2}>
          <Skeleton
            variant="rectangular"
            width={56}
            height={56}
            sx={{ borderRadius: 2.5, mr: 2 }}
          />
          <Skeleton variant="text" width="70%" height={32} />
        </Box>

        {/* Description */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />

        {/* Updated */}
        <Skeleton variant="text" width="40%" sx={{ mt: 2 }} />
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
        <Skeleton variant="rectangular" width={80} height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
      </CardActions>
    </Card>
  );
}
