import { Checkbox, FormControlLabel } from "@pankod/refine-mui";
import { useFormContext } from "@pankod/refine-react-hook-form";

export const RememeberMe = () => {
    const { register } = useFormContext();

    return (
        <FormControlLabel
            sx={{
                span: {
                    fontSize: "12px",
                    color: "text.secondary",
                },
            }}
            color="secondary"
            control={
                <Checkbox
                    size="small"
                    id="rememberMe"
                    {...register("rememberMe")}
                />
            }
            label="Remember me"
        />
    );
};