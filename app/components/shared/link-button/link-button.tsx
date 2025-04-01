import Image from "next/image";
import Link from "next/link";
import redirectSvg from "../../../../public/svg/redirect.svg";
interface Props {
  redirectUrl: string;
  svg: string;
  svgWidth?: number;
  text?: string;
}

const LinkButton = ({ redirectUrl, svg, svgWidth, text }: Props) => {
  return (
    <Link href={redirectUrl} target="_blank" className="w-max flex gap-1">
      {svg && (
        <Image
          src={svg}
          alt="reddit"
          width={svgWidth ?? 20}
          height={svgWidth ?? 20}
        />
      )}
      {text && <span className="text-primary-250 text-sm">Website</span>}
      <Image
        src={redirectSvg}
        alt="reddit"
        width={13}
        height={13}
        className="mb-2"
      />
    </Link>
  );
};

export default LinkButton;
